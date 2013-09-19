// Generated by CoffeeScript 1.6.3
(function() {
  var DEBUG, PARTS, TWITTER, bind, cats, final_name, name_parts, optionsFor, selects, sourceInfo, tweetButton;

  rxt.importTags();

  bind = rx.bind;

  DEBUG = true;

  PARTS = 3;

  TWITTER = "killercup";

  cats = window.categories;

  name_parts = rx.array(_(cats).chain().keys().sample(PARTS).value());

  final_name = bind(function() {
    var _ref;
    if (!(name_parts != null ? typeof name_parts.all === "function" ? (_ref = name_parts.all()) != null ? _ref.length : void 0 : void 0 : void 0)) {
      return console.error(name_parts, 'is not cool');
    }
    return name_parts.all().map(function(cat) {
      var vals, _ref1;
      vals = (_ref1 = cats[cat]) != null ? _ref1.values : void 0;
      if (!(vals != null ? vals.length : void 0)) {
        return;
      }
      return _.sample(vals, 1)[0];
    }).join(" ").split(" ").map(_.str.capitalize).join(" ");
  });

  optionsFor = function(categories, selected) {
    return _.map(cats, function(cat, key) {
      return option({
        value: key,
        selected: key === selected
      }, cat.name);
    });
  };

  sourceInfo = function(categories, selected) {
    var sec;
    if ('' === selected) {
      return "(Will be ignored.)";
    }
    sec = categories != null ? categories[selected] : void 0;
    if ((sec != null ? sec.source : void 0) == null) {
      return console.error(selected, "is not a section of", categories);
    }
    return a({
      href: sec.source
    }, "Source");
  };

  selects = function(name_parts, final_name) {
    var _i, _ref, _results;
    return section({
      "class": 'panel panel-default'
    }, [
      form({
        "class": 'panel-body form-inline text-center'
      }, (function() {
        _results = [];
        for (var _i = 0, _ref = PARTS - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(i) {
        return div({
          "class": 'form-group'
        }, [
          select({
            "class": 'form-control input-lg',
            change: function() {
              return name_parts.splice(i, 1, this.val());
            }
          }, [
            option({
              value: ''
            }, '– Nope –')
          ].concat(optionsFor(categories, name_parts.at(i)))), div({
            "class": 'help-block'
          }, bind(function() {
            return [sourceInfo(categories, name_parts.at(i))];
          }))
        ]);
      }).concat([
        div({
          "class": 'form-group'
        }, [
          button({
            "class": 'btn btn-lg btn-primary',
            click: function(ev) {
              ev.preventDefault();
              return final_name.refresh();
            }
          }, "Generate!"), div({
            "class": 'help-block'
          }, "Click it again!")
        ])
      ]))
    ]);
  };

  tweetButton = function(final_name) {
    return a({
      "class": "btn btn-primary",
      target: "_blank",
      href: bind(function() {
        return "https://twitter.com/share?related=" + TWITTER + "&via=" + TWITTER + "&text=" + (encodeURIComponent('Codename: ' + final_name.get())) + "&url=" + window.location.origin;
      })
    }, [
      i({
        "class": "icon-twitter"
      }, ' '), "Tweet"
    ]);
  };

  jQuery(function($) {
    if (DEBUG) {
      window.n = name_parts;
      window.f = final_name;
    }
    $('body').addClass('js');
    $('#selects').append(selects(name_parts, final_name));
    $('#final_name').append(span(final_name));
    return $('#share').append(tweetButton(final_name));
  });

}).call(this);
