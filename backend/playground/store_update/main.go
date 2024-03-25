package main

import (
	"backend/lib/db"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/pkg/store"
	"context"
	"fmt"
)

func main() {
	envset.LoadEnv()
	session := db.Session()
	ctx := context.Background()
	// storeRow := ent.Store{
	// 	ID:                   "footdistrict",
	// 	KorID:                "풋디스트릭트",
	// 	StoreURL:             "https://footdistrict.com/en/",
	// 	Country:              "ES",
	// 	TaxReduction:         0,
	// 	TaxReductionManually: false,
	// 	Currency:             "EUR",
	// 	IntlShippingFee: &schema.ShippingFee{
	// 		Light: 15,
	// 		Heavy: 15,
	// 		Shoes: 15,
	// 	},
	// 	ShippingFeeCumulation:   false,
	// 	IntlFreeShippingMin:     0,
	// 	DomesticShippingFee:     7,
	// 	DomesticFreeShippingMin: 0,
	// 	DeliveryAgency:          "UPS",
	// 	BrokerFee:               false,
	// 	Ddp:                     false,
	// }
	d, err := local_file.LoadJson[[]db.Store]("/Users/yangwoolee/repo/captured-filter/backend/playground/store_update/x.json")
	if err != nil {
		panic(err)
	}
	err = store.CreateStoresQuery(ctx, session, d)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Store Inserting Success!!")

}
