<?php
namespace App\Models\Traits\Attributes;

trait UserAttributes
{

	/**
     * @param $password
     */
    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn($value) => bcrypt($value),
            get: fn($value) => $value,
        );
    }


    /**
     * @return image with url
     */
    public function getAvatarWithUrlAttribute()
    {
    
        if(!empty($this->avatar) && file_exists('uploads/users/'.$this->avatar)){
            return asset('uploads/users/'.$this->avatar);
        }
    }

}    