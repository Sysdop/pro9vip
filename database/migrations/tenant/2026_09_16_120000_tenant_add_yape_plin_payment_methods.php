<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Deja listos los metodos de pago "Yape" y "Plin" en el catalogo del negocio.
 *
 * La captura de pagos Yape/Plin (modulo MobileApp) asigna el pago a la venta usando el
 * metodo del catalogo cuya DESCRIPCION contiene "yape" o "plin"; asi lo resuelve la app
 * y asi lo valida el backend (`exists:tenant.payment_method_types,id`). Sin esas filas
 * el cajero tenia que crearlas a mano en Ventas > Metodos de pago, y mientras tanto la
 * app no podia asignar el pago.
 *
 * Es idempotente y no pisa nada: si el negocio ya tiene un metodo cuyo nombre contiene
 * "yape" (por ejemplo "Yape QR"), se respeta el suyo y no se crea otro.
 */
return new class extends Migration
{
    private const DESCRIPTIONS = ['Yape', 'Plin'];

    public function up()
    {
        if (!Schema::hasTable('payment_method_types')) {
            return;
        }

        foreach (self::DESCRIPTIONS as $description) {
            if ($this->alreadyExists($description)) {
                continue;
            }

            $id = $this->nextFreeId();

            // Catalogo lleno (99 codigos de dos digitos): se deja al usuario resolverlo
            // a mano antes que romper la migracion del tenant.
            if ($id === null) {
                continue;
            }

            DB::table('payment_method_types')->insert(array_merge([
                'id' => $id,
                'description' => $description,
                'has_card' => false,
                'number_days' => null,
                'charge' => null,
            ], $this->optionalColumns()));
        }
    }

    /**
     * No se borran filas: si el negocio ya registro pagos con ese metodo, eliminarlo
     * dejaria comprobantes apuntando a un metodo inexistente. Quitarlo, si de verdad
     * no se usa, es cosa de Ventas > Metodos de pago.
     */
    public function down()
    {
        //
    }

    /**
     * Mismo criterio que usa la app para mapear proveedor -> metodo: la descripcion
     * contiene el nombre. La comparacion la hace MySQL sin distinguir mayusculas.
     */
    private function alreadyExists(string $description): bool
    {
        return DB::table('payment_method_types')
            ->where('description', 'like', '%'.$description.'%')
            ->exists();
    }

    /**
     * El id es char(2) y NO es autoincremental: lo elige quien crea el metodo. Se toma
     * el primer codigo libre desde 11, porque del 01 al 10 son los de fabrica.
     */
    private function nextFreeId(): ?string
    {
        $used = DB::table('payment_method_types')
            ->pluck('id')
            ->map(fn ($id) => str_pad((string) $id, 2, '0', STR_PAD_LEFT))
            ->all();

        for ($number = 11; $number <= 99; $number++) {
            $candidate = str_pad((string) $number, 2, '0', STR_PAD_LEFT);

            if (!in_array($candidate, $used, true)) {
                return $candidate;
            }
        }

        return null;
    }

    /**
     * Columnas que se agregaron despues de crear la tabla. Se escriben solo si existen,
     * para que la migracion corra igual en una base que aun no las tiene.
     */
    private function optionalColumns(): array
    {
        $defaults = [
            'is_credit' => false,
            'is_cash' => false,
            'is_active' => true,
        ];

        $values = [];

        foreach ($defaults as $column => $value) {
            if (Schema::hasColumn('payment_method_types', $column)) {
                $values[$column] = $value;
            }
        }

        return $values;
    }
};
