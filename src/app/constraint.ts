import {Value} from './value';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Constraint {

    rdfTemplate = `
            <%restricted_class%> <http://www.w3.org/2000/01/rdf-schema#subClassOf>
              [ a <http://www.w3.org/2002/07/owl#Restriction> ;
                <http://www.w3.org/2002/07/owl#onProperty> <%on_property%> ;
                <%cardinality_type%> "%cardinality%"^^<http://www.w3.org/2001/XMLSchema#nonNegativeInteger> ;
                <http://www.w3.org/2002/07/owl#onClass> <%on_class%>
              ] .
    `;

    @JsonProperty('restricted_class', Value)
    restricted_class: Value = new Value();

    @JsonProperty('on_property', Value)
    on_property: Value = new Value();

    @JsonProperty('cardinality_type', Value)
    cardinality_type: Value = new Value();

    @JsonProperty('cardinality', Value)
    cardinality: Value = new Value();

    @JsonProperty('on_class', Value)
    on_class: Value = new Value();

    printInfo() {
        console.log('restricted_class = ' + this.restricted_class.value + ', ' +
                    'on_property = ' + this.on_property.value + ', ' +
                    'cardinality_type = ' + this.cardinality_type.value + ', ' +
                    'cardinality = ' + this.cardinality.value + ', ' +
                    'on_class = ' + this.on_class.value
          );
    }

    toRDF(): string {
      return this.rdfTemplate
                      .replace('%restricted_class%', this.restricted_class.value)
                      .replace('%on_property%', this.on_property.value)
                      .replace('%cardinality_type%', this.cardinality_type.value)
                      .replace('%cardinality%', this.cardinality.value)
                      .replace('%on_class%', this.on_class.value);
    }

}
