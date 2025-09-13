<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('position')->get();
        $positions = Position::all();
        return Inertia::render('User/Index', [
            'users' => $users,
            'positions' => $positions,
        ]);
    }

    public function store(UserRequest $request)
    {
        $addData = $request->validated();
        $addData['password'] = Hash::make($addData['password']);
        User::create($addData);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        $positions = Position::all();

        return Inertia::render('User/Edit', [
            'user' => $user,
            'positions' => $positions,
        ]);
    }

    public function update(UserRequest $request, string $id)
    {
        $user = User::findOrFail($id);

        $updateData = $request->validated();

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}