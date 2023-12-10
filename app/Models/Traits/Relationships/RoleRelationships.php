<?php
namespace App\Models\Traits\Relationships;
use App\Models\Auth\User;

trait RoleRelationships
{

 	/**
     * @return mixed
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}	