import { Cardinality } from './cardinality';
import {Component, OnInit} from '@angular/core';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {Constraint} from './constraint';
import { ContextModelClass } from './context_model_class';
import { ContextModelProperty } from './context_model_property';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'HLO Editor';
    hlo_contraints: Constraint[];
    cm_classes: ContextModelClass[];
    cm_properties: ContextModelProperty[];
    cardinalities: Cardinality[] = [
          new Cardinality('http://www.w3.org/2002/07/owl#qualifiedCardinality', 'Exactly'),
          new Cardinality('http://www.w3.org/2002/07/owl#minQualifiedCardinality', 'Minimum'),
          new Cardinality('http://www.w3.org/2002/07/owl#maxQualifiedCardinality', 'Maximum'),
    ];
    ngOnInit() {
        // Define a JSON object (could come from a HTTP service, parsed with JSON.parse() if necessary)
        const jsonConstraints: object = {
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

        const jsonContextModelClasses: object = {
          'head': {
            'vars': [ 'class' ]
          } ,
          'results': {
            'bindings': [
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#ConnectivityPattern' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#Rule' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#PermanentId' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#LeastFrequentAccessLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsualDeviceType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Object' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#DataFragmentationAndDistribution' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#DateTime' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Product' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#LeastFrequentDateTimeInstance' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#FilePermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#Asymmetric' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#BootstrappingDFDPolicy' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Person' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#MixedFragmentation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#Hybrid' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#AccessSequencePattern' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentDateTimeInterval' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#Policy' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#Sharding' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Connectivity' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#DatabaseFragmentation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#Authorisation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#PermissionPattern' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#EphemeralId' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsualDateTimeInterval' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#BootstrappingCryptoRule' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#DateTimeInterval' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Notebook' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentConnectionType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#SecurityContextElement' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#RecentlyAccessedObject' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#AuthenticationMethod' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#ProductOrService' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#NonRelational' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#AbstractLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#RecentlyGrantedPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsualDateTimeInstance' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#DistributionMetric' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#NetworkLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#DatastoreDDLPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#VerticalFragmentation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Stationary' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#ConnectionCiphersuite' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#SoftwareAgent' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Relational' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsuallyAccessedObject' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#MasterSlaveReplication' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#HierarchicalDataStructure' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Mobile' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACRule' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsuallyGrantedPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Coordinates' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#ConnectionSecurity' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#DAO' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#XORContextExpression' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#CombiningAlgorithms' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Group' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#WebEndpointPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#ClassHandler' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Method' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#Permission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#POI' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Instant' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ContextExpression' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Auth' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#RelationalDataFragmentation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#DDEElement' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentDateTimeInstance' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Point' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#PhysicalLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentlyAccessedObject' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#SecurityProtocol' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#DataDistribution' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#ContextPattern' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#DDLPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#PreferredLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#PolicySetCombiningAlgorithms' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentlyGrantedPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#Replication' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#DataPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACPolicy' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#NOTContextExpression' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#DateTimePattern' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ANDContextExpression' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Address' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#CryptographicType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#LeastFrequentDateTimeInterval' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#HorizontalFragmentation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#Symmetric' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://schema.org/Action' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentDeviceType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsualConnectionType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#ConnectionType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#PolicyCombiningAlgorithms' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ABACPolicySet' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#File' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#DataArtefact' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#BootstrappingCryptoPolicy' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#LeastAccessedObject' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Subject' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Organization' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Location' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Service' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#ORContextExpression' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#ExcludedProvider' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#PolicySet' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Smartphone' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Volume' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Area' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#ObjectPattern' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#Tablet' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#PreferredProvider' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#FileSystemStructurePermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#VolumePermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#DeviceType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#IdentityType' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsualConnectionSecurity' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#AuthorizationMethod' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#LocationPattern' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentAccessLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#InfrastructureArtefact' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#PeerToPeerReplication' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#MostFrequentlyDeniedPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#BootstrappingDFDPolicySet' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#RecentlyDeniedPermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#ExcludedLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#RecentAccessLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#UsualAccessLocation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#NonRelationalDataFragmentation' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#ConnectionMetric' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#DatastorePermission' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#BootstrappingCryptoPolicySet' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#BootstrappingDFDRule' }
              } ,
              {
                'class': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#SoftwareArtefact' }
              }
            ]
          }
        };

        const jsonContextModelProperties: object = {
          'head': {
            'vars': [ 'property' ]
          } ,
          'results': {
            'bindings': [
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasActor' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUGThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasHour' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#isVolumeEncrypted' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#hasActionStatus' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasABACRule' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#belongsToCryptoPolicySet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasPointCoordinates' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasYear' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasAction' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasFileName' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasRectangularRangeHeight' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#hasTarget' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUCTThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasMinute' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasAsymmetricKeySize' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#refersToSubject' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasName' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUTIThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasLocation' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasPolicyCombiningAlgorithm' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasVolumeType' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasAddress' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasSecond' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasNonRelationalType' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#description' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasPatternParameter' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#hasControlledObject' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#handler' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#refersToEconomicUnion' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasCurve' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#refersToObject' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#hasBootStrappingCryptoRule' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#supportsEncryptedStorageStationary' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasPrivacyConstraint' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasStationaryOS' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#belongsToDFDPolicySet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#refersToContinentalUnion' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasFileType' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasRole' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasRectangularRangeWidth' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasSecurityProtocolImplementation' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#addressRegion' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasSymmetricBlockSize' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#hasDFDPolicySet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#refersToPermission' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasAuthenticationMethod' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasConnectionSecurity' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasPermission' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasPattern' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#hasRule' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasRoomNumber' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasTelecommunicationsProvider' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasBeginningDay' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasIPAddressRange' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasMetricUnit' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasBeginning' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#refersTo' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUTThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasDay' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#category' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#after' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasMobileOS' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pwd#belongsToPolicySet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#addressLocality' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasCircularRadius' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#hasStartTime' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasConnectionType' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasModeofOperation' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#legalName' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#latitude' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUDTThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasDeviceType' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasAuthorizationMethod' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasTimeWindow' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasConnectionMetric' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasZone' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#numberOfVMs' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#hasCryptoPolicySet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasIMSI' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#streetAddress' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasPolicyContextExpression' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#volumeOutputSpeed' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#numberOfPhysicalLocations' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasBuildingNumber' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#before' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#packageName' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#isChildOf' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#numberOfServers' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasEnd' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUCSThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasIdentityType' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#hasResult' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasControlledObject' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasTimezone' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#belongsToABACPolicySet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasBrand' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasAccessedObject' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasDownloadRate' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#supportsEncryptedStorageMobile' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasPolicySetCombiningAlgorithm' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#hasCryptoElement' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasRelationalType' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbe#hasControlledObject' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasEndDay' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasFilePath' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasUploadRate' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasAreaCoordinates' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasAuthorisation' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasContextExpression' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasTarget' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasDomain' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#addressCountry' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasIPAddress' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUAThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#hasBootstrappingDFDRule' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasFloorNumber' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasSymmetricKeySize' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasFragRow' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasPort' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#elevation' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#postalCode' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#volumeInputSpeed' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pbdfd#hasDFDElement' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasDUNS' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasPolicySetContextExpression' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasSubnet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#longitude' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/cpsm/2016/05/20#hasUAOThreshold' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasABACPolicySet' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasMonth' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasIMEI' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/dsm/2016/05/20#hasFragColumn' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/psm/2016/05/20#hasEndTime' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasArea' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#hasEndpoint' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasEvaluationResult' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword-project.eu/ontologies/casm/2016/05/20#name' }
              } ,
              {
                'property': { 'type': 'uri' , 'value': 'http://www.paasword.eu/security-policy/seerc/pac#hasParameter' }
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

        // let sparql_response: SparqlResponse;
        try {
            // sparql_response = jsonConvert.deserialize(jsonConstraints, SparqlResponse);
            this.hlo_contraints = jsonConvert.deserialize(JSON.parse(JSON.stringify(jsonConstraints)).results.bindings, Constraint);
            this.cm_classes = jsonConvert.deserialize(JSON.parse(JSON.stringify(jsonContextModelClasses)).results.bindings, ContextModelClass);
            this.cm_properties = jsonConvert.deserialize(JSON.parse(JSON.stringify(jsonContextModelProperties)).results.bindings, ContextModelProperty);
            this.printInfo();
        } catch (e) {
            console.log((<Error>e));
        }
    }

    printInfo() {
        for (const constraint of this.hlo_contraints) {
            constraint.printInfo();
        }

//        for (const cm_class of this.cm_classes) {
//          cm_class.printInfo();
//        }
//
//        for (const cm_property of this.cm_properties) {
//          cm_property.printInfo();
//        }
    }

    deleteConstraint(constraint: Constraint) {
        const index = this.hlo_contraints.indexOf(constraint, 0);
        if (index > -1) {
           this.hlo_contraints.splice(index, 1);
        }
    }

    addConstraint() {
        this.hlo_contraints.unshift(new Constraint());
    }
}
