package main

import (
	"backend/db"
	"backend/ent"
	"backend/ent/schema"
	"backend/pkg/store"
	"context"
	"fmt"
)

func main() {
	session := db.Session()
	ctx := context.Background()
	storeRow := ent.Store{
		ID:                   "footdistrict",
		KorID:                "풋디스트릭트",
		StoreURL:             "https://footdistrict.com/en/",
		Country:              "ES",
		TaxReduction:         0,
		TaxReductionManually: false,
		Currency:             "EUR",
		IntlShippingFee: &schema.ShippingFee{
			Light: 15,
			Heavy: 15,
			Shoes: 15,
		},
		ShippingFeeCumulation:   false,
		IntlFreeShippingMin:     0,
		DomesticShippingFee:     7,
		DomesticFreeShippingMin: 0,
		DeliveryAgency:          "UPS",
		BrokerFee:               false,
		Ddp:                     false,
	}
	err := store.CreateStore(ctx, session, &storeRow)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Store Inserting Success!! : %s", storeRow.KorID)
}
