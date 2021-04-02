package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"time"

	"github.com/daritelska-platforma/accounts/v2/pb/account"
	"github.com/google/uuid"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type server struct{}

func main() {
	port := os.Getenv("PORT")
	lis, err := net.Listen("tcp", ":"+port)
	fmt.Println("Listening on http://127.0.0.1:" + port)
	if err != nil {
		panic(err)
	}
	srv := grpc.NewServer()
	account.RegisterAccountServiceServer(srv, &server{})
	reflection.Register(srv)

	if e := srv.Serve(lis); e != nil {
		panic(err)
	}
}

func (s *server) CreateAccount(_ context.Context, request *account.CreateAccountRequest) (*account.CreateAccountResponse, error) {

	fmt.Println("Executing Accounts.CreateAccount with:", request)

	return &account.CreateAccountResponse{
		Id:        uuid.NewString(),
		Email:     request.GetEmail(),
		FirstName: request.FirstName,
		LastName:  request.LastName,
	}, nil
}

func (s *server) ListAccounts(_ context.Context, request *account.ListAccountsRequest) (*account.ListAccountsResponse, error) {
	fmt.Println("Executing Accounts.ListAccounts")

	accounts := []*account.Account{
		{
			Id:        uuid.NewString(),
			Email:     fmt.Sprintf("%s%d%s", "ilko+", time.Now().UnixNano(), "@camplight.net"),
			FirstName: "Ilko",
			LastName:  "Kacharov",
		},
		{
			Id:        uuid.NewString(),
			Email:     fmt.Sprintf("%s%d%s", "ilko+", time.Now().UnixNano(), "@camplight.net"),
			FirstName: "Stafan",
			LastName:  "Kirov",
		},
		{
			Id:        uuid.NewString(),
			Email:     fmt.Sprintf("%s%d%s", "ilko+", time.Now().UnixNano(), "@camplight.net"),
			FirstName: "John",
			LastName:  "Doe",
		},
	}

	return &account.ListAccountsResponse{Accounts: accounts}, nil
}
