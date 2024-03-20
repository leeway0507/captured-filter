package store

import (
	"backend/db"
	"backend/ent"
	"backend/ent/store"
	"context"
)

func GetStores(ctx context.Context, session *ent.Client,
) ([]*ent.Store, error) {
	return session.Store.Query().All(ctx)
}

func GetStore(ctx context.Context, session *ent.Client, storeName string,
) (*ent.Store, error) {
	return session.Store.Query().Where(store.IDEQ(storeName)).First(ctx)
}

func CreateStore(ctx context.Context, session *ent.Client, storeData *ent.Store) error {
	createStoreRow := db.CreateStoreRow(session, ctx, storeData)

	err := createStoreRow.Exec(ctx)

	if err != nil {
		return err
	}
	return nil
}
