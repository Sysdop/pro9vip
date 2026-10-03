<?php

namespace Tests\Unit\TenantSchedules;

use Hyn\Tenancy\Contracts\Website;
use Hyn\Tenancy\Environment;

/**
 * Reemplaza el Environment de hyn: registra cada cambio de empresa sin reconectar
 * bases. Cada elemento de $switches es una reconexion que haria el sistema real.
 */
class FakeEnvironment extends Environment
{
    /**
     * @var int[] ids de website en el orden en que se conectaron
     */
    public $switches = [];

    private $current = null;

    public function __construct()
    {
        // sin el constructor de hyn: no se identifica ninguna empresa por hostname
    }

    public function tenant(Website $website = null): ?Website
    {
        if ($website !== null) {
            $this->switches[] = $website->id;
            $this->current = $website;

            return $website;
        }

        return $this->current;
    }
}
