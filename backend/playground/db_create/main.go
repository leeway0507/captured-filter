package main

import (
	"backend/db"
	"context"
)

func main() {
	session := db.Session()
	ctx := context.Background()
	err := session.Schema.Create(ctx)
	if err != nil {
		panic(err)
	}
}
