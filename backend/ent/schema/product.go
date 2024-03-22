package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Product holds the schema definition for the Product entity.
type Product struct {
	ent.Schema
}

// Fields of the Product.
// Fields of the User.
func (Product) Fields() []ent.Field {
	return []ent.Field{
		field.String("store_name").Optional(),
		field.String("brand"),
		field.String("product_name"),
		field.String("product_img_url"),
		field.String("product_url"),
		field.String("currency_code"),
		field.Float("retail_price"),
		field.Float("sale_price"),
		field.Bool("is_sale"),
		field.String("made_in").Optional(),
		field.String("kor_brand").Optional(),
		field.String("kor_product_name").Optional(),
		field.String("product_id").Optional(),
		field.String("gender").Optional(),
		field.String("color").Optional(),
		field.String("category").Optional(),
		field.String("category_spec").Optional(),
		field.Bool("sold_out").Default(false),
		field.Time("updated_at").SchemaType(map[string]string{
			dialect.MySQL: "datetime",
		}).Default(time.Now),
	}
}

// Edges of the Product.
func (Product) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("store", Store.Type).Ref("product").Unique().Field("store_name"),
	}
}
func (Product) Indexes() []ent.Index {
	return []ent.Index{
		// unique index.
		index.Fields("product_name", "product_url").
			Unique(),
	}
}

func isSale(retail float64, sale float64) bool {
	return retail > sale
}
