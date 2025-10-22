<?php

namespace digitalastronaut\craftauthortoolbar\web\twig;

use Craft;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AuthorToolbarTwigExtension extends AbstractExtension {
    public function getFunctions() {
        return [
            new TwigFunction('getStaticTranslations', [$this, 'getStaticTranslations']),
        ];
    }

    public function getStaticTranslations($language = 'en') {
        $file = Craft::getAlias("@digitalastronaut/craftauthortoolbar/translations/{$language}/author-toolbar.php");
        return file_exists($file) ? require $file : [];
    }
}