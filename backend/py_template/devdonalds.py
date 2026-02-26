import re
from typing import Annotated, List, Literal, Union

from flask import Flask, jsonify, request
from pydantic import BaseModel, Field, TypeAdapter, ValidationError, field_validator


# ==== Type Definitions, feel free to add or modify ===========================
class RequiredItem(BaseModel):
    name: str
    quantity: int


class Recipe(BaseModel):
    type: Literal["recipe"]
    name: str
    requiredItems: List[RequiredItem]

    @field_validator("requiredItems")
    @classmethod
    def validate_required_items(cls, items):
        seen = set()
        for item in items:
            if (item.name.lower()) in seen:
                raise ValueError(f"Duplicate required item: {item.name}")
            seen.add(item.name.lower())
        return items


class Ingredient(BaseModel):
    type: Literal["ingredient"]
    name: str
    cookTime: Annotated[int, Field(ge=0)]


Cookbook = Annotated[Union[Recipe, Ingredient], Field(discriminator="type")]
CookbookChecker = TypeAdapter(Cookbook)


class RecipeSummary(BaseModel):
    name: str
    cookTime: int
    ingredients: List[RequiredItem]


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = {}


# Task 1 helper (don't touch)
@app.route("/parse", methods=["POST"])
def parse():
    data = request.get_json()
    recipe_name = data.get("input", "")
    parsed_name = parse_handwriting(recipe_name)
    if parsed_name is None:
        return "Invalid recipe name", 400
    return jsonify({"msg": parsed_name}), 200


# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that
def parse_handwriting(recipeName: str) -> Union[str | None]:
    if not recipeName:
        return None

    cleaned_name = re.sub(r"[-_]", " ", recipeName)
    cleaned_name = re.sub(r"[^a-zA-Z\s]", "", cleaned_name)
    words = cleaned_name.split()
    final_name = " ".join(word.capitalize() for word in words)

    if len(final_name) > 0:
        return final_name

    return None


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route("/entry", methods=["POST"])
def create_entry():
    data = request.get_json()

    if not data:
        return "Invalid JSON", 400

    try:
        entry = CookbookChecker.validate_python(data)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400

    if entry.name in cookbook:
        return jsonify({"error": f"Entry with name '{entry.name}' already exists"}), 400

    cookbook[entry.name] = entry
    return {}, 200


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name

cache = {}


@app.route("/summary", methods=["GET"])
def summary():
    name = request.args.get("name")
    if not name or name not in cookbook:
        return jsonify({"error": "Recipe not found"}), 400

    if cookbook[name].type != "recipe":
        return jsonify({"error": "Requested entry is not a recipe"}), 400

    def get_ingredients(item_name: str):
        if item_name in cache:
            return cache[item_name]

        item = cookbook.get(item_name)
        if not item:
            raise ValueError(f"Item '{item_name}' not found in cookbook")

        if item.type == "ingredient":
            result = (item.cookTime, {item_name: 1})
            cache[item_name] = result
            return result

        total_time = 0
        ingredient_counts = {}
        for req_item in item.requiredItems:
            req_time, req_ingredients = get_ingredients(req_item.name)
            total_time += req_time * req_item.quantity
            for ing_name, ing_count in req_ingredients.items():
                ingredient_counts[ing_name] = (
                    ingredient_counts.get(ing_name, 0) + ing_count * req_item.quantity
                )

        result = (total_time, ingredient_counts)
        cache[item_name] = result
        return result

    try:
        total_cook_time, ingredients = get_ingredients(name)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    summary_ingredients = [
        RequiredItem(name=ing_name, quantity=ing_count)
        for ing_name, ing_count in ingredients.items()
    ]

    summary = RecipeSummary(
        name=name, cookTime=total_cook_time, ingredients=summary_ingredients
    )

    return summary.model_dump(), 200


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == "__main__":
    app.run(debug=True, port=8080)
