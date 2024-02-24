package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Product holds the schema definition for the Product entity.
type DeliveryAgency struct {
	ent.Schema
}
type AgencyShippingFee struct {
	Light float32
	Heavy float32
	Shoes float32
}

// Fields of the Product.
// Fields of the User.
func (DeliveryAgency) Fields() []ent.Field {
	return []ent.Field{
		field.String("country"),
		field.Float("VAT_reduction_rate"),
		field.JSON("shipping_fee", &AgencyShippingFee{}),
		field.Time("updated_at").Default(time.Now),
	}
}

// Edges of the Product.
// Edges of the User.
func (DeliveryAgency) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("products", Product.Type),
	}
}
