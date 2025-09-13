<?php

namespace App\Http\Controllers;

use App\Http\Requests\PositionRequest;
use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PositionController extends Controller
{
    public function index(): Response
    {
        $positions = Position::all();
        return Inertia::render('Position/Index', [
            'positions' => $positions,
        ]);
    }

    public function store(PositionRequest $request)
    {
        Position::create($request->validated());

        return redirect()->route('positions.index')->with('success', 'Position created successfully.');
    }

    public function update(PositionRequest $request, string $id)
    {
        $position = Position::findOrFail($id);

        $position->update($request->validated());

        return redirect()->route('positions.index')->with('success', 'Position updated successfully.');
    }

    public function destroy(string $id)
    {
        $position = Position::findOrFail($id);

        if ($position->users()->count() > 0) {
            return redirect()->route('positions.index')->with('error', 'Cannot delete position that is assigned to users.');
        }

        $position->delete();

        return redirect()->route('positions.index')->with('success', 'Position deleted successfully.');
    }
}