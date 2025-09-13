<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'position_id' => ['required', 'integer', 'exists:positions,id'],
        ];

        if ($this->isMethod('post')) {
            $rules['email'] = ['required', 'email', 'unique:users,email'];
            $rules['password'] = ['required', 'string', 'min:8'];
        } else {
            $rules['email'] = ['nullable', 'email', 'unique:users,email,' . $this->route('user')];
            $rules['password'] = ['nullable', 'string', 'min:8'];
        }

        return $rules;
    }
}