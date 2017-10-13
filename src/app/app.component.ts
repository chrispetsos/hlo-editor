import { Cardinality } from './cardinality';
import {Component, OnInit} from '@angular/core';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {Constraint} from './constraint';
import { ContextModelClass } from './context_model_class';
import { ContextModelProperty } from './context_model_property';
import { HttpClient } from '@angular/common/http';

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

    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient) {}

    ngOnInit() {
        // Choose your settings
        // Check the detailed reference in the chapter "JsonConvert class properties and methods"
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
        jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

        const constraintsJsonUrl = 'http://localhost:3030/constraints/query?query=PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0Aprefix%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0A%0ASELECT%20%3Frestricted_class%20%3Fon_property%20%3Fcardinality_type%20%3Fcardinality%20%3Fon_class%0AWHERE%20%7B%0A%20%20%7B%0A%09%3Frestricted_class%20rdfs%3AsubClassOf%20_%3AR1%20.%0A%09_%3AR1%20a%20owl%3ARestriction%20.%0A%20%20%09_%3AR1%20owl%3AonProperty%20%3Fon_property%20.%0A%20%20%09_%3AR1%20%3Fcardinality_type%20%3Fcardinality%20.%0A%20%20%09_%3AR1%20owl%3AonClass%20_%3AOC%20.%0A%20%20%09_%3AOC%20owl%3AunionOf%20%3Flist%20.%0A%20%20%09%3Flist%20rdf%3Arest*%2Frdf%3Afirst%20%3Fon_class%20.%0A%20%20%7D%0A%20%20UNION%0A%20%20%7B%0A%09%3Frestricted_class%20rdfs%3AsubClassOf%20_%3AR2%20.%0A%09_%3AR2%20a%20owl%3ARestriction%20.%0A%20%20%09_%3AR2%20owl%3AonProperty%20%3Fon_property%20.%0A%20%20%09_%3AR2%20%3Fcardinality_type%20%3Fcardinality%20.%0A%20%20%09_%3AR2%20owl%3AonClass%20%3Fon_class%20.%0A%20%20%20%20FILTER(!isBlank(%3Fon_class))%0A%20%20%7D%0A%20%20FILTER(!isBlank(%3Frestricted_class))%0A%20%20FILTER%20(%3Fcardinality_type%20%3D%20owl%3AqualifiedCardinality%20%7C%7C%20%3Fcardinality_type%20%3D%20owl%3AminQualifiedCardinality%20%7C%7C%20%3Fcardinality_type%20%3D%20owl%3AmaxQualifiedCardinality)%0A%7D&format=json';
        let jsonConstraints: object;
        this.http.get(constraintsJsonUrl).subscribe(data => {
          jsonConstraints = data;
            try {
              this.hlo_contraints = jsonConvert.deserialize(JSON.parse(JSON.stringify(jsonConstraints)).results.bindings, Constraint);
            } catch (e) {
                console.log((<Error>e));
            }
        });

        const contextModelClassesJsonUrl = 'http://localhost:3030/context_model/query?query=PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%0Aselect%20distinct%20%3Fclass%20where%20%7B%0A%20%20%7B%0A%20%20%20%20%3Fclass%20rdfs%3AsubClassOf*%20%5Ba%20rdfs%3AClass%5D%20.%0A%20%20%7D%0A%7D&format=json';
        let jsonContextModelClasses: object;
        this.http.get(contextModelClassesJsonUrl).subscribe(data => {
          // Read the result field from the JSON response.
          jsonContextModelClasses = data;
            try {
              this.cm_classes = jsonConvert.deserialize(JSON.parse(JSON.stringify(jsonContextModelClasses)).results.bindings, ContextModelClass);
            } catch (e) {
                console.log((<Error>e));
            }
        });

        const contextModelPropertiesJsonUrl = 'http://localhost:3030/context_model/query?query=PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%0Aselect%20distinct%20%3Fproperty%20where%20%7B%0A%20%20%7B%0A%20%20%20%20%3Fproperty%20rdfs%3AsubPropertyOf*%20%5Ba%20rdf%3AProperty%5D%20.%0A%20%20%7D%0A%7D&format=json';
        let jsonContextModelProperties: object;
        this.http.get(contextModelPropertiesJsonUrl).subscribe(data => {
          // Read the result field from the JSON response.
          jsonContextModelProperties = data;
            try {
            this.cm_properties = jsonConvert.deserialize(JSON.parse(JSON.stringify(jsonContextModelProperties)).results.bindings, ContextModelProperty);
            } catch (e) {
                console.log((<Error>e));
            }
        });
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

    saveConstraints() {
        let rdfConstraints = '';
        for (const constraint of this.hlo_contraints) {
            rdfConstraints += constraint.toRDF();
        }
        console.log(rdfConstraints);
    }
}
