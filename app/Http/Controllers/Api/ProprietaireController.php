<?php
namespace App\Http\Controllers;

use App\Models\Proprietaire;
use App\Models\User;
use Illuminate\Http\Request;

class ProprietaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // User ID => Syndic ID => Immeuble ID => Propriétaires
        $usr      = auth()->user();
        $immeuble = $usr->syndic->immeuble;
        if (! $immeuble) {
            return response()->json(['message' => 'Immeuble not found'], 404);
        }
        // Fetch all proprietaires for the authenticated user's immeuble
        $proprietaires = $immeuble->proprietaires;
        return response()->json($proprietaires);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'               => 'required|string|max:255',
            'email'              => 'required|email|unique:users,email',
            'password'           => 'required|string|min:8',
            'phone'              => 'required|string|unique:proprietaires,phone',
            'etage'              => 'required|integer',
            'numero_appartement' => 'required|integer',
        ]);

        return \DB::transaction(function () use ($validated) {

            $user = User::create([
                'name'     => $validated['name'],
                'email'    => $validated['email'],
                'password' => bcrypt($validated['password']),
                'role'     => 'proprietaire',
            ]);

            // Get The immeuble of the the proprietaire from the immeuble of the syndic
            $authUser = auth()->user();
            $immeuble = $authUser->syndic->immeuble;

            $proprietaire = Proprietaire::create([
                'user_id'            => $user->id,
                'phone'              => $validated['phone'],
                'etage'              => $validated['etage'],
                'numero_appartement' => $validated['numero_appartement'],
                'immeuble_id'        => $immeuble->id,
            ]);

            return response()->json($proprietaire, 201);

        });
        
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