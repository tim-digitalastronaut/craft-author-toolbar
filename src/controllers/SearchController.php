<?php

namespace brammortier\craftauthortoolbar\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

class SearchController extends Controller {
    public function actionIndex(): Response {
        return $this->renderTemplate('author-toolbar/requests/_search.twig');
    }
}