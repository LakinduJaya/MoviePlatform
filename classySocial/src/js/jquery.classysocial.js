/*!
 * jQuery ClassySocial
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Updated by Steven Enten - steventen <steven@enten.fr>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 2.2.0
 *
 */
(function($) {
    $.fn.ClassySocial = function(toggleCallback) {
    	if (!$.isFunction(toggleCallback)) {
    		toggleCallback = function() { };
    	}
        var ClassySocial = function(element) {
            this.profiles = {
                facebook: {
                    url: 'http://www.facebook.com/{handle}',
                    name: 'Facebook',
                    tip: 'View my Facebook page'
                },
                google: {
                    url: 'https://plus.google.com/{handle}',
                    name: 'Google Plus',
                    tip: 'View my Google Plus profile'
                },
                twitter: {
                    url: 'https://twitter.com/{handle}',
                    name: 'Twitter',
                    tip: 'Check out my Twitter profile'
                },
                pinterest: {
                    url: 'http://pinterest.com/{handle}',
                    name: 'Pinterest',
                    tip: 'View my Pinterest profile'
                },
                linkedin: {
                    url: 'http://www.linkedin.com/profile/view?id={handle}',
                    name: 'LinkedIn',
                    tip: 'View my LinkedIn profile'
                },
                dribbble: {
                    url: 'http://dribbble.com/{handle}',
                    name: 'Dribbble',
                    tip: 'View my Dribble page'
                },
                email: {
                    url: 'mailto:{handle}',
                    name: 'Email',
                    tip: 'Send me an e-mail'
                },
                socl: {
                    url: 'http://www.so.cl/#/profile/{handle}',
                    name: 'Socl',
                    tip: 'View my Socl profile'
                },
                instagram: {
                    url: 'http://instagram.com/{handle}',
                    name: 'Instagram',
                    tip: 'View my Instagram profile'
                },
                vimeo: {
                    url: 'http://vimeo.com/{handle}',
                    name: 'Vimeo',
                    tip: 'View my Vimeo profile'
                },
                youtube: {
                    url: 'http://www.youtube.com/user/{handle}',
                    name: 'YouTube',
                    tip: 'Check out my Youtube profile'
                },
                github: {
                    url: "https://www.github.com/{handle}",
                    name: 'GitHub',
                    tip: 'View my GitHub developer profile'
                },
                blogger: {
                    profile_url: "http://www.blogger.com/profile/{handle}",
                    name: 'Blogger',
                    tip: 'View my Blogger profile'
                },
                deviantart: {
                    url: 'https://{handle}.deviantart.com',
                    name: 'DeviantArt',
                    tip: 'Check out my DeviantArt page'
                },
                flickr: {
                    url: 'http://www.flickr.com/photos/{handle}',
                    name: 'Flickr',
                    tip: 'View my Flickr images'
                },
                skype: {
                    url: 'skype:{handle}?userinfo',
                    name: 'Skype',
                    tip: 'Call me on Skype'
                },
                steam: {
                    url: 'http://steamcommunity.com/profiles/{handle}',
                    name: 'Steam',
                    tip: 'View my Steam profile'
                },
                wordpress: {
                    url: 'http://{handle}.wordpress.com',
                    name: 'Wordpress',
                    tip: 'View my wordpress.com profile'
                },
                yahoo: {
                    url: 'http://profile.yahoo.com/y/pulse/{handle}',
                    name: 'Yahoo',
                    tip: 'Check out my Yahoo profile'
                }
            };

            var el = $(element);
            var networks = el.attr('data-networks') ? el.attr('data-networks').toLowerCase().split(",") : undefined;
            var orientation = el.attr('data-orientation') ? el.attr('data-orientation').toLowerCase() : 'arc';
            var arcStart = el.attr('data-arc-start') ? parseInt(el.attr('data-arc-start')) : 0;
            var arcLength = el.attr('data-arc-length') ? parseInt(el.attr('data-arc-length')) : 180;
            var radius = el.attr('data-radius') ? parseInt(el.attr('data-radius')) : 80;
            var gap = el.attr('data-gap') ? parseInt(el.attr('data-gap')) : 50;
            var picture = el.attr('data-picture') ? el.attr('data-picture') : 'none';
            var imageType = el.attr('data-image-type') ? el.attr('data-image-type').toLowerCase() : 'picture';
            var theme = el.attr('data-theme') ? el.attr('data-theme').toLowerCase() : 'default';

            this.__constructor = function() {
                el.addClass('bubble');
                var template = this.template;
                if (imageType === 'facebook') {
                    picture = 'https://graph.facebook.com/' + picture + '/picture?type=large';
                }
                el.html(template["container"].replace(/\{imageURL\}/gi, picture));
                var container = el.find(".scontainer");
                for (var t = 0; t < networks.length; t++) {
                    var i = networks[t], o = this.profiles[i], u;
                    if (o['url'] && el.attr('data-' + i + '-handle')) {
                        u = o['url'].replace(/\{handle\}/gi, el.attr('data-' + i + '-handle'));
                    }
                    else {
                        continue;
                    }
                    var a = template['button'].replace(/\{URL\}/gi, u).replace(/\{tip\}/gi, o['tip']).replace(/\{name\}/gi, o['name']).replace(/\{network\}/gi, i), f = $(a);
                    container.append(f);
                }
                return this._build(template);
            };

            this._build = function(template) {
                var tpl = template['orientations'][orientation] ? template['orientations'][orientation] : template['orientations']['arc'];
                el.find('.smain').click(tpl);
                return this;
            };

            this.template = {
                container: '<a class="smain ' + theme + '" title="Find Me Here" alt="Find Me Here">' +
                        '<img src="{imageURL}" title="Find Me Here" alt="Find Me Here"/>' +
                        '</a>' +
                        '<div class="scontainer ' + theme + '"></div>',
                button: '<a class="sbutton {network}" title="{tip}" target="_blank" href="{URL}" data-network="{network}">{name}</a>',
                orientations: {
                    arc: function() {
                        if ($(this).hasClass('disabled')) {
                            return;
                        }
                        var e = 250, t = 250, r = el.find('.sbutton').length, i = e + (r - 1) * t, s = 0;
                        var o = $(this).outerWidth(), l = $(this).outerHeight();
                        var c = el.find('.sbutton:eq(0)').outerWidth(), h = el.find('.sbutton:eq(0)').outerHeight();
                        var p = (o - c) / 2, d = (l - h) / 2;
                        var w = 0;
                        var z = { duration: e, complete: function() { w++; if (w == r) toggleCallback(); } };
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('disabled').delay(i).queue(function(e) {
                                $(this).removeClass('disabled').addClass('active');
                                e();
                            });
                            var v = arcLength / r, m = arcStart + v / 2;
                            el.find('.sbutton').each(function() {
                                var n = m / 180 * Math.PI, o = p + radius * Math.cos(n), i = d + radius * Math.sin(n);
                                $(this).css({
                                    display: 'block',
                                    left: p + 'px',
                                    top: d + 'px'
                                }).stop().delay(t * s).animate({
                                    left: o + 'px',
                                    top: i + 'px'
                                }, z);
                                m += v;
                                s++;
                            });
                        }
                        else {
                            s = r - 1;
                            $(this).addClass('disabled').delay(i).queue(function(e) {
                                $(this).removeClass('disabled').removeClass('active');
                                e();
                            });
                            el.find('.sbutton').each(function() {
                                $(this).stop().delay(t * s).animate({
                                    left: p,
                                    top: d
                                }, z);
                                s--;
                            });
                        }
                    },
                    linedown: function() {
                        if ($(this).hasClass('disabled')) {
                            return;
                        }
                        var e = 500, t = 250, r = el.find('.sbutton').length, i = gap, s = e + (r - 1) * t, o = 1;
                        var a = $(this).outerWidth(), f = $(this).outerHeight();
                        var c = el.find('.sbutton:eq(0)').outerWidth(), h = el.find('.sbutton:eq(0)').outerHeight();
                        var p = (a - c) / 2, d = (f - h) / 2, v = arcStart / 180 * Math.PI;
                        var w = 0;
                        var z = { duration: e, complete: function() { w++; if (w == r) toggleCallback(); } };
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('disabled').delay(s).queue(function(e) {
                                $(this).removeClass('disabled').addClass('active');
                                e();
                            });
                            el.find('.sbutton').each(function() {
                                var n = p + (p + i * o) * Math.cos(v), r = d + (d + i * o) * Math.sin(v);
                                $(this).css({
                                    display: 'block',
                                    left: d + 'px',
                                    top: p + 'px'
                                }).stop().delay(t * o).animate({
                                    left: r + 'px',
                                    top: n + 'px'
                                }, z);
                                o++;
                            });
                        }
                        else {
                            o = r;
                            $(this).addClass('disabled').delay(s).queue(function(e) {
                                $(this).removeClass('disabled').removeClass('active');
                                e();
                            });
                            el.find('.sbutton').each(function() {
                                $(this).stop().delay(t * o).animate({
                                    left: d,
                                    top: p
                                }, z);
                                o--;
                            });
                        }
                    },
                    line: function() {
                        if ($(this).hasClass('disabled')) {
                            return;
                        }
                        var e = 500, t = 250, r = el.find('.sbutton').length, i = gap, s = e + (r - 1) * t, o = 1;
                        var a = $(this).outerWidth(), f = $(this).outerHeight();
                        var c = el.find('.sbutton:eq(0)').outerWidth(), h = el.find('.sbutton:eq(0)').outerHeight();
                        var p = (a - c) / 2, d = (f - h) / 2, v = arcStart / 180 * Math.PI;
                        var w = 0;
                        var z = { duration: e, complete: function() { w++; if (w == r) toggleCallback(); } };
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('disabled').delay(s).queue(function(e) {
                                $(this).removeClass('disabled').addClass('active');
                                e();
                            });
                            el.find('.sbutton').each(function() {
                                var n = p + (p + i * o) * Math.cos(v), r = d + (d + i * o) * Math.sin(v);
                                $(this).css({
                                    display: 'block',
                                    left: p + 'px',
                                    top: d + 'px'
                                }).stop().delay(t * o).animate({
                                    left: n + 'px',
                                    top: r + 'px'
                                }, z);
                                o++;
                            });
                        }
                        else {
                            o = r;
                            $(this).addClass('disabled').delay(s).queue(function(e) {
                                $(this).removeClass('disabled').removeClass('active');
                                e();
                            });
                            el.find('.sbutton').each(function() {
                                $(this).stop().delay(t * o).animate({
                                    left: p,
                                    top: d
                                }, z);
                                o--;
                            });
                        }
                    }
                }
            };
            return this.__constructor();
        };
        return this.each(function() {
            return new ClassySocial(this);
        });
    };
})(jQuery);