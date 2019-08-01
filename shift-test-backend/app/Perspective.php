<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Perspective extends Model
{
    public function question()
    {
        return $this->belongsTo(\App\Question::class);
    }
}
