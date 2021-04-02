package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/daritelska-platforma/graphql-gateway/graph/generated"
	"github.com/daritelska-platforma/graphql-gateway/graph/model"
	"github.com/daritelska-platforma/graphql-gateway/pb/account"
)

func (r *mutationResolver) CreateAccount(ctx context.Context, input model.CreateAccount) (*model.Account, error) {
	resp, err := r.Resolver.AccountClient.CreateAccount(ctx, &account.CreateAccountRequest{
		Email:     input.Email,
		Password:  *input.Password,
		FirstName: input.FirstName,
		LastName:  input.LastName,
	})

	if err != nil {
		fmt.Println("GRPC Error:", err)
		return nil, err
	}

	fmt.Println("GRPC Response:", resp)
	return &model.Account{
		ID:        resp.Id,
		Email:     resp.Email,
		FirstName: resp.FirstName,
		LastName:  resp.LastName,
	}, nil
}

func (r *mutationResolver) CreateCampaign(ctx context.Context, input model.CreateCampaign) (*model.Campaign, error) {
	panic(fmt.Errorf("CreateCampaign not implemented"))
}

func (r *queryResolver) Campaigns(ctx context.Context) ([]*model.Campaign, error) {
	panic(fmt.Errorf("Campaigns not implemented"))
}

func (r *queryResolver) Accounts(ctx context.Context) ([]*model.Account, error) {
	resp, err := r.Resolver.AccountClient.ListAccounts(ctx, &account.ListAccountsRequest{})

	if err != nil {
		fmt.Println("GRPC Error:", err)
		return nil, err
	}

	fmt.Println("GRPC Response:", resp)
	accounts := []*model.Account{}

	for _, a := range resp.Accounts {
		accounts = append(accounts, &model.Account{
			ID:        a.Id,
			Email:     a.Email,
			FirstName: a.FirstName,
			LastName:  a.LastName,
		})
	}

	return accounts, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
