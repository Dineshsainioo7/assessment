<?php

namespace Database\Seeders\Auth;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Permission;

class PermissionTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        

    	Permission::truncate();

        $permissions = [
            [
                'name' => 'View Backend',
                'slug' => 'view-backend',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'View Frontend',
                'slug' => 'view-frontend',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Create User',
                'slug' => 'create-user',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Edit User',
                'slug' => 'edit-user',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Delete User',
                'slug' => 'delete-user',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];


        Permission::insert($permissions);
    }
}
