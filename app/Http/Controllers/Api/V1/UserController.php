<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use App\Http\Requests\Api\V1\StoreUserRequest;
use App\Http\Resources\UserResource;

/**
 * Class UserController.
 */
class UserController extends APIController
{
    
     /**
     * UserController constructor.
     *
     * @param UserRepository $userRepository
     */
      public function __construct(
        protected  UserRepository $userRepository,
    ) {}

    public function index()
    {
        $users = $this->userRepository->retrieveList();
        return $this->sendResponse('Get all user list.',UserResource::collection($users));
    }

    /**
     * Create a new user.
     *
     * @param \App\Http\Requests\Api\V1\StoreUserRequest
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreUserRequest $request)
    {
    	
         try {
         	$user = $this->userRepository->create($request->validated());
		    return $this->sendResponse('User has been created successfully.',new UserResource($user));

         } catch (\Exception $e) {
         		return $this->sendError('something went wrong');
         }
    }
}
