<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            [
                'name' => 'Manager',
                'description' => 'Responsible for overseeing team operations and strategic planning.',
            ],
            [
                'name' => 'Developer',
                'description' => 'Develops and maintains software applications and systems.',
            ],
            [
                'name' => 'Designer',
                'description' => 'Creates user interfaces and user experience designs.',
            ],
            [
                'name' => 'Analyst',
                'description' => 'Analyzes data and provides insights for business decisions.',
            ],
            [
                'name' => 'Administrator',
                'description' => 'Manages administrative tasks and system configurations.',
            ],
        ];

        foreach ($positions as $position) {
            Position::firstOrCreate(
                ['name' => $position['name']],
                $position
            );
        }
    }
}
