<?php

namespace digitalastronaut\craftauthortoolbar\controllers;

use Craft;
use craft\elements\Entry;
use craft\web\Controller;
use yii\web\Response;

use digitalastronaut\craftauthortoolbar\AuthorToolbar;

class ToolbarController extends Controller {
    protected array|int|bool $allowAnonymous = true;

    public function actionGetHtml($entryId): Response {
         $entry = Entry::find()->id($entryId)->one();
         $settings = AuthorToolbar::getInstance()->getSettings();

         return $this->renderTemplate('author-toolbar/_toolbar.twig', [
             'entry' => $entry,
             'settings' => $settings
         ]);
     }
}