package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"time"

	proto "github.com/daritelska-platforma/accounts/v2/pb/account"
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
	proto.RegisterAccountServiceServer(srv, &server{})
	reflection.Register(srv)

	if e := srv.Serve(lis); e != nil {
		panic(err)
	}
}

func (s *server) CreateAccount(_ context.Context, request *proto.CreateAccountRequest) (*proto.CreateAccountResponse, error) {

	fmt.Println("Executing Accounts.CreateAccount with:", request)

	return &proto.CreateAccountResponse{
		Id:        fmt.Sprintf("%s%d", "test-id-@", time.Now().UnixNano()),
		Email:     request.GetEmail(),
		FirstName: "Ilko",
		LastName:  "Kacharov",
	}, nil
}
