<?php

namespace App\Http\Requests\Tenant;

use App\Models\Tenant\Person;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PersonRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->input('id');
        $type = $this->input('type');
        $email = $this->input('email');

        // La unicidad solo compite entre registros habilitados: un cliente inhabilitado con el
        // mismo número/nombre no debe bloquear al habilitado. Si el que se edita está
        // inhabilitado tampoco se valida; el cruce se revisa al habilitarlo (PersonController@enabled).
        $editing_disabled = $id && Person::where('id', $id)->where('enabled', false)->exists();

        $unique = function ($column, $by_type = true) use ($id, $type, $editing_disabled) {
            if ($editing_disabled) {
                return [];
            }

            return [
                Rule::unique('tenant.persons', $column)->where(function ($query) use ($type, $by_type) {
                    $query->where('enabled', true);
                    if ($by_type) {
                        $query->where('type', $type);
                    }
                })->ignore($id, 'id')
            ];
        };

        return [
            'number' => array_merge(['required'], $unique('number')),
            'name' => array_merge(['required'], $unique('name')),
            'identity_document_type_id' => [
                'required',
            ],
            'country_id' => [
                'required',
            ],
            // 'person_type_id' => [
            //     'required_if:type,"customers"',
            // ],
            'department_id' => [
                'required_if:identity_document_type_id,"066"',
            ],
            'province_id' => [
                'required_if:identity_document_type_id,"066"',
            ],
            'district_id' => [
                'required_if:identity_document_type_id,"066"',
            ],
            'address' => [
                'required_if:identity_document_type_id,"066"',
            ],
            'email' => array_merge([
                isset($email) ? 'required' : 'nullable',
                'email',
            ], $unique('email', false)),
            'internal_code' => 'max:100'
        ];
    }
}
