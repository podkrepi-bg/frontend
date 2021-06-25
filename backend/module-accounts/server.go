package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/podkrepi-bg/types/go-types/account"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type server struct {
	account.UnimplementedAccountServiceServer
}

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

func (s *server) CreateAccount(_ context.Context, request *account.CreateAccountRequest) (*account.Account, error) {

	fmt.Println("Executing Accounts.CreateAccount with:", request)

	return &account.Account{
		Id:        uuid.NewString(),
		Email:     request.Email,
		FirstName: request.FirstName,
		LastName:  request.LastName,
	}, nil
}

func (s *server) ListAccounts(_ context.Context, request *account.ListAccountsRequest) (*account.AccountList, error) {
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
			FirstName: "Stefan",
			LastName:  "Kirov",
		},
		{
			Id:        uuid.NewString(),
			Email:     fmt.Sprintf("%s%d%s", "ilko+", time.Now().UnixNano(), "@camplight.net"),
			FirstName: "John",
			LastName:  "Doe",
		},
	}

	return &account.AccountList{Accounts: accounts}, nil
}
