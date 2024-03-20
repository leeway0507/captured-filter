package deliveryagency

import (
	"backend/db"
	"backend/ent"
	"backend/ent/deliveryagency"
	"context"
)

func GetDeliveryAgencies(ctx context.Context, session *ent.Client,
) ([]*ent.DeliveryAgency, error) {
	return session.DeliveryAgency.Query().All(ctx)
}

func GetDeliveryAgency(ctx context.Context, session *ent.Client, id int,
) (*ent.DeliveryAgency, error) {
	return session.DeliveryAgency.Query().Where(deliveryagency.IDEQ(id)).First(ctx)
}

func CreateDeliveryAgency(ctx context.Context, session *ent.Client, deliveryagencyData *ent.DeliveryAgency) error {
	createDeliveryAgencyRow := db.CreateDelveryAgencyRow(session, ctx, deliveryagencyData)

	err := createDeliveryAgencyRow.Exec(ctx)

	if err != nil {
		return err
	}
	return nil
}
