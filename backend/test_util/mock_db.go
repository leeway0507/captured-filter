package testutil

import (
	"backend/ent"
	"backend/ent/enttest"
	"context"
	"log"
	"testing"

	_ "github.com/mattn/go-sqlite3"
)

func MockDB(t *testing.T) *ent.Client {
	session := enttest.Open(t, "sqlite3", "file:ent?mode=memory&_fk=1")
	ctx := context.Background()
	err := session.Schema.Create(ctx)

	if err != nil {
		log.Fatal("Failed to session Schema Create")
	}
	return session
}
