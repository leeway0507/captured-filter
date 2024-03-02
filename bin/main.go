package main

import (
	"fmt"
	"os"
	"os/exec"
	"strings"

	"github.com/fatih/color"
)

func GenerateEnt() {
	green.Println("=== Generating Entity Files ===")
	execCmd("go", "run", "-mod=mod", "entgo.io/ent/cmd/ent", "generate", "./schema", "--target", "./entity")
}

func All() {
	GenerateEnt()
	NextjsBuild()
	GoTest()
	GoBuild()
}

// Nextjs Commands
func NodeTest() {
	green.Println("=== Running Node Test Project ===")
	execCmd("npm", "run", "test", "--run", "--prefix", "admin")
}
func NodeTestCoverage() {
	green.Println("=== Running Node Test Project ===")
	execCmd("npm", "run", "coverage", "--prefix", "admin")
}

// Golang Commands
func GoRun() {
	green.Println("=== Running Golang Project ===")
	execCmd("go", "run", "./backend/main.go")
}

func GoBuild() {
	green.Println("=== Building Golang Project ===")
	execCmd("go", "build", "-C", "./backend", "-o", "../app", "-v")
}

func GoTest() {
	green.Println("=== Running Golang Tests ===")
	execCmd("go", "test", "./backend/...")
}

// Nextjs Commands
func NextjsRun() {
	green.Println("=== Running Nextjs Project ===")

	execCmd("npm", "run", "dev", "--prefix", "frontend")
}

func NextjsBuild() {
	green.Println("=== Building Nextjs Project ===")
	if hasCommand("pnpm") {
		execCmd("pnpm", "run", "-C", "./template ", "build")
	} else {
		execCmd("npm", "run", "build", "--prefix ", "./template")
	}
}

// func Dev() {
// 	go NextjsRun()
// 	go GoRun()

// 	select {}
// }

func Dev() {
	execCmd("./bin/dev.sh")
}

// Execute a command
func execCmd(args ...string) {
	cmd := exec.Command(args[0], args[1:]...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

// Check if a command exists
func hasCommand(cmd string) bool {
	_, err := exec.LookPath(cmd)
	return err == nil
}

func main() {
	if len(os.Args) < 2 {
		Info()
		return
	}

	command := os.Args[1]

	switch command {
	case "info":
		Info()

	case "node-test":
		NodeTest()
	case "node-test-coverage":
		NodeTestCoverage()
	case "go-run":
		GoRun()
	case "go-build":
		GoBuild()
	case "go-test":
		GoTest()
	case "nextjs-run":
		NextjsRun()
	case "nextjs-build":
		NextjsBuild()
	case "generate-ent":
		GenerateEnt()
	case "dev":
		Dev()
	case "all":
		All()
	default:
		fmt.Println("Invalid command.")
	}
}

func Info() {
	green := color.New(color.FgGreen).PrintfFunc()
	bold := color.New(color.Bold).PrintlnFunc()

	SPACES := strings.Repeat(" ", 2)

	green("------------------------------------------\n")
	green("-   Entgo and Nextjs Full Stack App   -\n")
	green("------------------------------------------\n")
	fmt.Println("This Bash helps you manage your projects.")
	fmt.Println()
	fmt.Println("Available commands:")
	bold("- go-run:" + SPACES + "Run the Golang project.")
	bold("- go-build:" + SPACES + "Build the Golang project.")
	bold("- go-test:" + SPACES + "Run tests for the Golang project.")
	bold("- nextjs-run:" + SPACES + "Run the Nextjs project.")
	bold("- nextjs-build:" + SPACES + "Build the Nextjs project.")
	bold("- github:" + SPACES + "Open your GitHub profile in a browser.")
	bold("- generate-ent:" + SPACES + "Generate entity files.")
	bold("- all:" + SPACES + "Run all commands (GenerateEnt, NextjsBuild, GoTest, GoBuild).")
	fmt.Println()
	fmt.Println("Usage: go run ./bin <command>")
}

var green = color.New(color.FgGreen)

// bold  = color.New(color.Bold)
