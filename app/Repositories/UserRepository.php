<?php
namespace App\Repositories;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;




class UserRepository
{
	/**
     * Associated Repository Model.
     */
    public function __construct(
        protected  User $user,
    ) {}


   /**
    * @return Collection
    */
   public function retrieveList()
   {
        return $this->user->with('roles')->latest()->get();
   }

    /**
     * @param array $data
     *
     * @throws \Exception
     * @throws \Throwable
     * @return \Illuminate\Database\Eloquent\Model|mixed
     */
    public function create(array $data)
    {
    	
        $user = $this->createUserStub($data);
        $role_ids = $data['role_ids'] ?? '';

        return DB::transaction(function () use ($user) {
            if ($user->save()) {
                //Attach new roles
            	$roles   = empty($role_ids)
            						? Role::where('name', config('access.users.default_role'))->get()->pluck('id')->toArray()
            						: $role_ids;
				//Attach new roles
                $user->roles()->attach($roles);

                //If we are getting permission ID then
                //  $user->permissions()->attach($permissions);
                
            }
            // Return the user object
            return $user;
        });
    }

    /**
     * @param  $input
     *
     * @return mixed
     */
    protected function createUserStub($input)
    {
    	// pass file and folder name
    	$avatar = $this->fileHandler($input['avatar'],'users');
    	
        $user = $this->user;
        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->phone_number = $input['phone_number'];
        $user->description = $input['description'];
        $user->avatar = $avatar;
        $user->password = 'secret';
        //we are using a default password with hash format, which is not a black field, in DB
       

        return $user;
    }

    /**
     * @param  $file and folder path
     *
     * @return mixed
     */

    public function fileHandler($file,$folder= "")
    {
        try {
            $filename = time().'_'.rand(10, 100).'.'.$file->extension() ?? '.png';
            $file->move(public_path('uploads/'.$folder), $filename);

            return $filename;
            // file temp path upload folder and return file name
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


}
