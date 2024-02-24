package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Product holds the schema definition for the Product entity.
type Product struct {
	ent.Schema
}

// Fields of the Product.
// Fields of the User.
func (Product) Fields() []ent.Field {
	return []ent.Field{
		field.Int("store_id"),
		field.String("brand"),
		field.String("product_name"),
		field.Int("price"),
		field.String("kor_brand").Optional(),
		field.String("kor_product_name").Optional(),
		field.String("product_id").Optional(),
		field.Enum("gender").Values("w", "m", "b").Optional(),
		field.String("color").Optional(),
		field.String("category").Optional(),
		field.String("category_spec").Optional(),
		field.Bool("sold_out").Default(false),
		field.Time("updated_at").Default(time.Now),
	}
}

// Edges of the Product.
func (Product) Edges() []ent.Edge {
	return nil
}
