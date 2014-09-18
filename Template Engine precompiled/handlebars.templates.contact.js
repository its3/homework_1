(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['contact'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<article class=\"contact\">\n    <h1>"
    + escapeExpression(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"lastName","hash":{},"data":data}) : helper)))
    + ", "
    + escapeExpression(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"initials","hash":{},"data":data}) : helper)))
    + " ("
    + escapeExpression(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nickname","hash":{},"data":data}) : helper)))
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
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + "</div>\n    <div>"
    + escapeExpression(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "</div>\n</article>";
},"useData":true});
})();