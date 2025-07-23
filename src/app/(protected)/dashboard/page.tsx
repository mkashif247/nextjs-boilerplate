'use client';

import { useAuth } from '@/context/authContext';
import { useUser } from '@/context/user-context';
import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/services/constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, removeTodo, Todo } from '@/redux/slices/todoSlice'; // Import Todo type
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function Home() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { userData, isLoading, logoutUser } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(routes.login);
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    logoutUser();
    router.push(routes.login);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  if (!isAuthenticated || isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Welcome, {userData?.id || 'User'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">You are logged in.</p>
          <Button onClick={handleLogout} className="w-full mb-6">
            Logout
          </Button>

          <h2 className="text-xl font-semibold mb-3">Your Todos</h2>
          <div className="flex w-full mb-4 space-x-2">
            <Input
              type="text"
              value={newTodo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="flex-grow"
            />
            <Button onClick={handleAddTodo}>Add Todo</Button>
          </div>

          <ul className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground">No todos yet!</p>
            ) : (
              todos.map((todo: Todo) => (
                <li key={todo.id} className="flex items-center justify-between p-3 border rounded-md bg-card shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo.id)}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`text-base ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveTodo(todo.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
