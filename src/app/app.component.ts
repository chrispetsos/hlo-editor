import {Component, OnInit} from '@angular/core';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {SparqlResponse} from './sparql_response';
import {Constraint} from './constraint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'HLO Editor';
    ngOnInit() {
        // Define a JSON object (could come from a HTTP service, parsed with JSON.parse() if necessary)
        const jsonObject: object = {
          'head': {
            'vars': [ 'restricted_class' , 'on_property' , 'cardinality_type' , 'cardinality' , 'on_class' ]
          } ,
          'results': {
            'bindings': [
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#Policy' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#belongsToPolicySet' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#PolicySet' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACPolicy' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasPolicyCombiningAlgorithm' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#PolicyCombiningAlgorithms' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACPolicySet' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasPolicySetCombiningAlgorithm' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#PolicySetCombiningAlgorithms' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasControlledObject' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Object' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasAuthorisation' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#Authorisation' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasAction' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#DataPermission' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasActor' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Subject' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.w3.org/2000/01/rdf-schema#subClassOf' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '0' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#contradicts' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#qualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '0' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#Policy' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#hasRule' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#minQualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#Rule' }
              } ,
              {
                'restricted_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' } ,
                'on_property': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#equivalentClass' } ,
                'cardinality_type': { 'type': 'uri' , 'value': 'http://www.w3.org/2002/07/owl#maxQualifiedCardinality' } ,
                'cardinality': { 'type': 'literal' , 'datatype': 'http://www.w3.org/2001/XMLSchema#integer' , 'value': '1' } ,
                'on_class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' }
              }
            ]
          }
        };

        // Choose your settings
        // Check the detailed reference in the chapter "JsonConvert class properties and methods"
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
        jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

        let sparql_response: SparqlResponse;
        try {
            sparql_response = jsonConvert.deserialize(jsonObject, SparqlResponse);
            const constraints = sparql_response.results.constraints;
            for (const constraint of constraints) {
                constraint.printInfo();
            }
        } catch (e) {
            console.log((<Error>e));
        }
  }
}
