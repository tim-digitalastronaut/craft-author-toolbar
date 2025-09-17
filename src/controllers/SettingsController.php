<?php

namespace brammortier\craftauthortoolbar\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

use brammortier\craftauthortoolbar\AuthorToolbar;

class SettingsController extends Controller {
    public function actionIndex(): Response {
        $settings = AuthorToolbar::getInstance()->getSettings();
        
        return $this->renderTemplate('author-toolbar/_settings.twig', [
            'settings' => $settings
        ]);
    }
}