package main

import (
	"backend/db"
	"backend/ent"
	"backend/ent/schema"
	"backend/pkg/store"
	"context"
)

func main() {
	session := db.Session()
	ctx := context.Background()

	storeRow := ent.Store{
		ID:           "consortium",
		URL:          "http://www.consortium.uk/",
		Country:      "UK",
		Currency:     "GBP",
		TaxReduction: 0.20,
		IntlShippingFee: &schema.ShippingFee{
			Light: 12.5,
			Heavy: 16.7,
			Shoes: 20.9,
		},
		IntlFreeShippingFee:     0,
		DomesticShippingFee:     5,
		DomesticFreeShippingFee: 80,
		ShippingFeeCumulation:   true,
		DeliveryAgency:          "royal mail",
		BrokerFee:               true,
		Ddp:                     false,
	}
	err := store.CreateStore(ctx, session, &storeRow)
	if err != nil {
		panic(err)
	}
}
