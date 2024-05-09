<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('api');
                $response = [
                    'success' => true,
                    'token' => $token->plainTextToken,
                    'user' => $user
                ];
                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    "message" => "Invalid credentials"
                ];
                return response($response, 422);
            }
        } else {
            $response = [
                'success' => false,
                "message" =>'User does not exist'
            ];
            return response($response, 422);
        }
    }
}
