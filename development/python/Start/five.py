def calculate(num1, num2, operation):
    if operation == 'add':
        return num1 + num2
    elif operation == 'subtract':
        return num1 - num2
    elif operation == 'multiply':
        return num1 * num2
    elif operation == 'divide':
        if num2 != 0:
            return num1 / num2
        else:
            return "Error! Division by zero."
    else:
        return "Invalid operation"

def main():
    print("Welcome to the simple calculator!")
    
    try:
        num1 = float(input("Enter the first number: "))
        num2 = float(input("Enter the second number: "))
    except ValueError:
        print("Invalid input. Please enter numeric values.")
        return
    
    print("\nChoose the operation:")
    print("add - Addition")
    print("subtract - Subtraction")
    print("multiply - Multiplication")
    print("divide - Division")
    
    operation = input("\nEnter the operation: ").lower()

    result = calculate(num1, num2, operation)
    print(f"The result of {operation} is: {result}")

if __name__ == "__main__":
    main()
