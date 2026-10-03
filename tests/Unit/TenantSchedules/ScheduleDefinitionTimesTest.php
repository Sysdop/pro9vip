<?php

namespace Tests\Unit\TenantSchedules;

use App\Services\System\TenantSchedules\DailyScheduleDefinition;
use Illuminate\Support\Carbon;
use PHPUnit\Framework\TestCase;

/**
 * Calculo del siguiente turno; sin base de datos
 */
class ScheduleDefinitionTimesTest extends TestCase
{
    private function daily(string $time)
    {
        return new class($time) extends DailyScheduleDefinition {
            private $time;

            public function __construct(string $time)
            {
                $this->time = $time;
            }

            public function command(): string { return 'test:daily'; }
            public function module(): string { return 'test'; }
            public function isNeeded(): bool { return true; }
            protected function time(): string { return $this->time; }

            public function from(string $time, Carbon $after, Carbon $date): Carbon
            {
                return $this->nextDailyOccurrenceFrom($time, $after, $date);
            }
        };
    }

    public function test_before_the_time_runs_today(): void
    {
        $this->assertSame('2026-09-25 08:00', $this->daily('08:00')->nextRunAt(Carbon::parse('2026-09-25 07:59:59'))->format('Y-m-d H:i'));
    }

    public function test_same_minute_counts_as_today(): void
    {
        $this->assertSame('2026-09-25 08:00', $this->daily('08:00')->nextRunAt(Carbon::parse('2026-09-25 08:00:45'))->format('Y-m-d H:i'));
    }

    public function test_after_the_time_runs_tomorrow(): void
    {
        $this->assertSame('2026-09-26 08:00', $this->daily('08:00')->nextRunAt(Carbon::parse('2026-09-25 08:01'))->format('Y-m-d H:i'));
    }

    public function test_future_date_waits_for_that_day(): void
    {
        $next = $this->daily('08:00')->from('08:30', Carbon::parse('2026-09-25 10:00'), Carbon::parse('2026-10-01'));

        $this->assertSame('2026-10-01 08:30', $next->format('Y-m-d H:i'));
    }

    /**
     * Una fecha ya pasada (dia perdido) se recupera en el siguiente turno, no se descarta
     */
    public function test_past_date_runs_at_the_next_turn(): void
    {
        $next = $this->daily('08:00')->from('08:30', Carbon::parse('2026-09-25 10:00'), Carbon::parse('2026-09-18'));

        $this->assertSame('2026-09-26 08:30', $next->format('Y-m-d H:i'));
    }
}
