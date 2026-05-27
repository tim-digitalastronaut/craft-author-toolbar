<?php
/**
 * Author toolbar plugin for Craft CMS
 *
 * A frontend toolbar that enhances the authoring experience by giving content
 * editors quick access to editing tools, entry actions, and contextual
 * controls directly from the site frontend.
 *
 * @link      https://digitalastronaut.be
 * @copyright Copyright (c) 2026 Digitalastronaut
 */

namespace digitalastronaut\craftauthortoolbar\web\twig;

use Craft;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Class AuthorToolbarTwigExtension
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class AuthorToolbarTwigExtension extends AbstractExtension {
    /**
     * @return TwigFunction[]
     */
    public function getFunctions(): array {
        return [
            new TwigFunction('getStaticTranslations', [$this, 'getStaticTranslations']),
        ];
    }

    /**
     * @return array
     */
    public function getStaticTranslations(): array {
        $language = Craft::$app->language;

        $fallbacks = [];

        if ($language) {
            $fallbacks[] = $language;

            if (str_contains($language, '-')) {
                $langOnly = explode('-', $language)[0];

                if (!\in_array($langOnly, $fallbacks, true)) $fallbacks[] = $langOnly;
            }
        }

        $fallbacks[] = 'en';

        foreach ($fallbacks as $lang) {
            $file = Craft::getAlias("@digitalastronaut/craftauthortoolbar/translations/{$lang}/author-toolbar.php");

            if (file_exists($file)) return require $file;
        }

        return [];
    }
}