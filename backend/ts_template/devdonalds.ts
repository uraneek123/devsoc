import express, { Request, Response } from "express";
import { z } from "zod";

// ==== Type Definitions, feel free to add or modify ==========================
const requiredItem = z.object({
  name: z.string(),
  quantity: z.number().int().min(0),
});

const recipe = z.object({
  type: z.literal("recipe"),
  name: z.string(),
  requiredItems: z.array(requiredItem).superRefine((items, ctx) => {
    const seen = new Set<string>();
    for (let i = 0; i < items.length; i++) {
      const lowerName = items[i].name.toLowerCase();
      if (seen.has(lowerName)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate required item: ${items[i].name}`,
        });
      }
      seen.add(lowerName);
    }
  }),
});

const ingredient = z.object({
  type: z.literal("ingredient"),
  name: z.string(),
  cookTime: z.number().int().min(0), 
});

const cookbookEntrySchema = z.discriminatedUnion("type", [
  recipe,
  ingredient,
]);

// Auto infer types
type CookbookEntry = z.infer<typeof cookbookEntrySchema>;
type RequiredItem = z.infer<typeof requiredItem>;

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Record<string, CookbookEntry> = {};
const cache: Record<string, { cookTime: number; ingredients: Record<string, number> }> = {};

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  if (!recipeName) return null;

  let cleaned_name = recipeName.replace(/[-_]/g, " ").replace(/[^a-zA-Z\s]/g, "");
  const words = cleaned_name.split(/\s+/).filter((word) => word.length > 0);
  
  const final_name = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return final_name.length > 0 ? final_name : null;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const data = req.body;

  if (!data || typeof data !== "object") {
    return res.status(400).send("Invalid JSON");
  }

  const parsedData = cookbookEntrySchema.safeParse(data);
  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error.message });
  }

  const entry = parsedData.data;
  if (cookbook[entry.name]) {
    return res.status(400).json({ error: `Entry with name '${entry.name}' already exists` });
  }

  cookbook[entry.name] = entry;
  return res.status(200).send({});
});


// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name

const get_ingredients = (itemName: string): { cookTime: number; ingredients: Record<string, number> } => {
  if (cache[itemName]) return cache[itemName];

  const item = cookbook[itemName];
  if (!item) {
    throw new Error(`Item '${itemName}' not found in cookbook`);
  }

  if (item.type === "ingredient") {
    const result = { cookTime: item.cookTime, ingredients: { [itemName]: 1 } };
    cache[itemName] = result;
    return result;
  }

  let totalTime = 0;
  const ingredientCounts: Record<string, number> = {};

  for (const reqItem of item.requiredItems) {
    const reqResult = get_ingredients(reqItem.name);

    totalTime += reqResult.cookTime * reqItem.quantity;

    for (const [ingName, ingCount] of Object.entries(reqResult.ingredients)) {
      ingredientCounts[ingName] = (ingredientCounts[ingName] || 0) + ingCount * reqItem.quantity;
    }
  }

  const result = { cookTime: totalTime, ingredients: ingredientCounts };
  cache[itemName] = result;
  return result;
};

app.get("/summary", (req:Request, res:Request) => {
  const { name } = req.query;
  if (!name || typeof name !== "string" || !cookbook[name]) {
    return res.status(400).json({ error: "Invalid 'name' query parameter" });
  }

  if (cookbook[name].type !== "recipe") {
    return res.status(400).json({ error: "Requested entry is not a recipe" });
  }

  try {
    const { cookTime, ingredients } = get_ingredients(name);

    const summary_ingredients: RequiredItem[] = Object.entries(ingredients).map(
      ([ingName, quantity]) => ({
        name: ingName,
        quantity: quantity,
      })
    );

    return res.status(200).json({
      name,
      cookTime,
      ingredients: summary_ingredients,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
