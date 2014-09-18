(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['contact'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<article class=\"contact\">\n    <h1>"
    + escapeExpression(lambda((depth0 != null ? depth0.lastName : depth0), depth0))
    + ", "
    + escapeExpression(lambda((depth0 != null ? depth0.firstName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.initials : depth0), depth0))
    + " ("
    + escapeExpression(lambda((depth0 != null ? depth0.nickname : depth0), depth0))
    + ")</h1>\n    <div>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.addressLine1 : stack1), depth0))
    + "</div>\n    <div>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.addressLine2 : stack1), depth0))
    + "</div>\n    <div>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.city : stack1), depth0))
    + ", "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.state : stack1), depth0))
    + " "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.zipCode : stack1), depth0))
    + "</div>\n    <div>"
    + escapeExpression(lambda((depth0 != null ? depth0.email : depth0), depth0))
    + "</div>\n    <div>"
    + escapeExpression(lambda((depth0 != null ? depth0.phoneNumber : depth0), depth0))
    + "</div>\n</article>";
},"useData":true});
})();