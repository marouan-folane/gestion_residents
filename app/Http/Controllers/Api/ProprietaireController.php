<?php
namespace App\Http\Controllers;

use App\Models\Proprietaire;
use Illuminate\Http\Request;

class ProprietaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $proprietaires =  Proprietaire::all();
        return response()->json($proprietaires);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usr = auth()->user();
        $immeuble = $usr->syndic->immeuble;

        $validated = $request->validate([
            'phone'              => 'required|string|unique:proprietaires,phone',
            'etage'              => 'required|integer',
            'numero_appartement' => 'required|integer',
        ]);

        $validated['immeuble_id'] = $immeuble->id;
        $validated['user_id']     = $usr->id;

        $proprietaire = Proprietaire::create($validated);
        return response()->json($proprietaire, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $proprietaire = Proprietaire::findOrFail($id);
        return response()->json($proprietaire);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $proprietaire = Proprietaire::findOrFail($id);

        $validated = $request->validate([
            'phone'              => 'sometimes|required|string|unique:proprietaires,phone,' . $id,
            'etage'              => 'sometimes|required|integer',
            'numero_appartement' => 'sometimes|required|integer',
        ]);

        $proprietaire->update($validated);
        return response()->json($proprietaire);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $proprietaire = Proprietaire::findOrFail($id);
        $proprietaire->delete();
        return response()->json(null, 204);
    }
}