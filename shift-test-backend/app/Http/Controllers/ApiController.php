<?php

namespace App\Http\Controllers;

use App\Question;
use App\Perspective;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function questions(Request $request)
    {
        return Question::all()->map(function ($value) {
            return ['id' => $value->id, 'content' => $value->question];
        })->toJson();
    }

    public function submit(Request $request)
    {
        $email = $request->input('email');
        
        $test = Perspective::max('test');
        $test = ($test ?: 0) + 1;

        $answers = Question::all()->map(function ($item) use ($request) {
            return [
                'question_id' => $item->id,
                'score' => $request->input('answer_'.$item->id)
            ];
        });

        $perspective = [];

        foreach ($answers as $answer) {
            $submitted = new Perspective;
            $submitted->test = $test;
            $submitted->email = $email;
            $submitted->score = $answer['score'];
            $submitted->question_id = $answer['question_id'];
            $submitted->save();

            $question = $submitted->question;
            $dimension = $question->dimension;
            $direction = $question->direction;
            $lean = $submitted->score - 4;
            
            if (isset($perspective[$dimension])) {
                $perspective[$dimension] += $lean * $direction;
            } else {
                $perspective[$dimension] = $lean * $direction;
            }
        }

        $dimensions = ['EI', 'SN', 'TF', 'JP'];
        $result = '';

        foreach ($dimensions as $value) {
            if ($perspective[$value] <= 0) {
                $result .= $value[0];
            } else {
                $result .= $value[1];
            }
        }

        return $result;
    }
}
