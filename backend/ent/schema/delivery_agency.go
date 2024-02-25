package schema

import (
	"time"

	"entgo.io/ent"
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

func (DeliveryAgency) Fields() []ent.Field {
	return []ent.Field{
		field.String("country"),
		field.Float("VAT_reduction_rate"),
		field.JSON("shipping_fee", &AgencyShippingFee{}),
		field.Time("updated_at").Default(time.Now),
	}
}

func (DeliveryAgency) Edges() []ent.Edge {
	return nil
}
