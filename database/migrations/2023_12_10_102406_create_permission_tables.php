<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 191)->unique();
            $table->string('slug', 191);
            $table->boolean('status')->default(1)->comment('0 = inactive,1 = active');
            $table->timestamps();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 191)->unique();
            $table->boolean('status')->default(1)->comment('0 = inactive,1 = active');
            $table->timestamps();
        });

        Schema::create('role_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned()->index('role_user_user_id_foreign');
            $table->bigInteger('role_id')->unsigned()->index('role_user_role_id_foreign');
        });

        Schema::create('permission_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('permission_id')->unsigned()->index('permission_user_permission_id_foreign');
            $table->bigInteger('user_id')->unsigned()->index('permission_user_user_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_tables');
    }
};
