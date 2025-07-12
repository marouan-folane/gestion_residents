<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Proprietaire;
use App\Models\Syndic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function register(RegisterRequest $request)
    {
        $credentials = $request->validated();

        // Hash the password
        $credentials['password'] = Hash::make($credentials['password']);

        // Create the user
        $user = User::create($credentials);

        $syndicat = Syndic::create([
            'phone'=>$credentials['phone'],
            'user_id'=>$user->id
        ]);

        // Generate API token
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        // Find the user with the given email and role
        $user = User::where('email', $credentials['email'])
            ->first();

        // If no user is found or password does not match, return an error response
        if (! $user || ! Hash::check($credentials['password'], $user->password) || $user->role != "syndic") {
            return response()->json([
                'message' => 'Provided email, password, or role is incorrect',
            ], 401);
        }

        // Generate API token
        $token = $user->createToken('main')->plainTextToken;
        
        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

}