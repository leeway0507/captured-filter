package db

import (
	"testing"
)

func TestSessionConnect(t *testing.T) {
	Session()
}

// ctx := context.Background()
// if err := client.Schema.Create(ctx); err != nil {
// 	log.Fatalf("failed creating schema resources: %v", err)
// }
// client.Product.Create().SetAge(10).SetName("lee").ExecX(ctx)

// client.Product.Delete().Where(product.Age(10)).ExecX(ctx)
